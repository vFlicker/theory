# WebSocket

## API

```ts
type EventsNamesType = "messages-received" | "status-changed";

type MessagesReceivedSubscriberType = (messages: ChatMessageAPI[]) => void;

type StatusChangedSubscriberType = (status: StatusType) => void;

type Callback = MessagesReceivedSubscriberType | StatusChangedSubscriberType;

export type ChatMessageAPI = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export type StatusType = "pending" | "ready" | "error";

const subscribers = {
    "messages-received": [] as MessagesReceivedSubscriberType[],
    "status-changed": [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach((sub) => sub(status));
};

const openHandler = () => {
    notifySubscribersAboutStatus("ready");
};

const messageHandler = (evt: MessageEvent) => {
    const newMessages = JSON.parse(evt.data);
    subscribers["messages-received"].forEach((sub) => sub(newMessages));
};

const closeHandler = () => {
    notifySubscribersAboutStatus("pending");
    setTimeout(createChannel, 3000);
};

const errorHandler = () => {
    notifySubscribersAboutStatus("error");
    console.error("REFRESH PAGE");
};

const cleanUp = () => {
    ws?.removeEventListener("open", openHandler);
    ws?.removeEventListener("message", messageHandler);
    ws?.removeEventListener("close", closeHandler);
    ws?.removeEventListener("error", errorHandler);
};

function createChannel() {
    cleanUp();
    ws?.close();

    ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
    );

    notifySubscribersAboutStatus("pending");

    ws.addEventListener("message", messageHandler);
    ws.addEventListener("open", openHandler);
    ws.addEventListener("close", closeHandler);
    ws.addEventListener("error", errorHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers["messages-received"] = [];
        subscribers["status-changed"] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(eventName: EventsNamesType, callback: Callback) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(
                (sub) => sub !== callback
            );
        };
    },
    unsubscribe(eventName: EventsNamesType, callback: Callback) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(
            (sub) => sub !== callback
        );
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
};
```

## Redux

```ts
import { ResultCodeForCapcthaEnum, ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { chatAPI, ChatMessageAPI, StatusType } from "../api/chat-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

// Types
type ChatMessageType = ChatMessageAPI & { id: string };

type MessagesReceivedActionType = {
    type: "SN/chat/MESSAGES_RECEIVED";
    payload: { messages: ChatMessageAPI[] };
};

type StatusChangedActionType = {
    type: "SN/chat/STATUS_CHANGED";
    payload: { status: StatusType };
};

type ActionsType = MessagesReceivedActionType | StatusChangedActionType;

type ThunkType = BaseThunkType<ActionsType | FormAction>;

export type InitialStateType = typeof initialState;

// Initial state
const initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType,
};

// Reducer
const chatReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "SN/chat/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.payload.messages.map((message) => ({
                        ...message,
                        id: v1(),
                    })),
                ].filter((_, index, array) => index >= array.length - 100),
            };
        case "SN/chat/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status,
            };
        default:
            return state;
    }
};

let _newMessageHandler: ((messages: ChatMessageAPI[]) => void) | null = null;
let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages));
        };
    }

    return _newMessageHandler;
};

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status));
        };
    }

    return _statusChangedHandler;
};

// Action creators
const messagesReceived = (
    messages: ChatMessageAPI[]
): MessagesReceivedActionType => ({
    type: "SN/chat/MESSAGES_RECEIVED",
    payload: { messages },
});

const statusChanged = (status: StatusType): StatusChangedActionType => ({
    type: "SN/chat/STATUS_CHANGED",
    payload: { status },
});

// Thunks
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch));
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(
        "messages-received",
        newMessageHandlerCreator(dispatch)
    );
    chatAPI.unsubscribe(
        "status-changed",
        statusChangedHandlerCreator(dispatch)
    );
    chatAPI.stop();
};

export const sendMessage =
    (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessage(message);
    };

export default chatReducer;
```

## Components

```tsx
import { ChatMessageAPIType } from "../../api/chat-api";
import {
    sendMessage,
    startMessagesListening,
    stopMessagesListening,
} from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";

export function ChatPage(): JSX.Element {
    return (
        <div>
            <Chat />
        </div>
    );
}

function Chat(): JSX.Element {
    const status = useSelector((state: AppStateType) => state.chat.status);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening());

        return () => {
            dispatch(stopMessagesListening());
        };
    }, []);

    const isError = status === "error";

    return (
        <div>
            {isError && <div>Some error occurred. Please refresh the page</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    );
}

function Messages(): JSX.Element {
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const messages = useSelector((state: AppStateType) => state.chat.messages);

    const handleScroll = (evt: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = evt.currentTarget;
        const indentFromBottom =
            element.scrollHeight - element.scrollTop - element.clientHeight;

        if (Math.abs(indentFromBottom) < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div
            style={{ height: "400px", overflowY: "auto" }}
            onScroll={handleScroll}
        >
            {messages.map((message, index) => (
                <Message key={message.id} message={message} />
            ))}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
}

const Message: React.FC<{ message: ChatMessageAPI }> = React.memo(
    ({ message }) => {
        return (
            <div>
                <img src={message.photo} style={{ width: "30px" }} />{" "}
                <b>{message.userName}</b>
                <br />
                {message.message}
                <hr />
            </div>
        );
    }
);

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
    ({ message }) => {
        return (
            <div>
                <img src={message.photo} style={{ width: "30px" }} />{" "}
                <b>{message.userName}</b>
                <br />
                {message.message}
                <hr />
            </div>
        );
    }
);

function AddMessageForm(): JSX.Element {
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const status = useSelector((state: AppStateType) => state.chat.status);

    const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(evt.target.value);
    };

    const handleSendMessage = () => {
        if (!message) return;

        dispatch(sendMessage(message));
        setMessage("");
    };

    return (
        <div>
            <div>
                <textarea
                    onChange={handleInputChange}
                    value={message}
                ></textarea>
            </div>
            <div>
                <button
                    disabled={status !== "ready"}
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
```
