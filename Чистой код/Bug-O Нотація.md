## «Bug-O» Нотація

```js
function trySubmit() {
    // Сегмент 1
    let spinner = createSpinner();
    formStatus.appendChild(spinner);
    submitForm()
        .then(() => {
            // Сегмент 2
            formStatus.removeChild(spinner);
            let successMessage = createSuccessMessage();
            formStatus.appendChild(successMessage);
        })
        .catch((error) => {
            // Сегмент 3
            formStatus.removeChild(spinner);
            let errorMessage = createErrorMessage(error);
            let retryButton = createRetryButton();
            formStatus.appendChild(errorMessage);
            formStatus.appendChild(retryButton);
            retryButton.addEventListener("click", function () {
                // Сегмент 4
                formStatus.removeChild(errorMessage);
                formStatus.removeChild(retryButton);
                trySubmit();
            });
        });
}
```

```js
let currentState = {
    step: "initial", // 'initial' | 'pending' | 'success' | 'error'
};

function trySubmit() {
    if (currentState.step === "pending") {
        // Не дозволяємо повторних submit-ів
        return;
    }
    setState({ step: "pending" });
    submitForm()
        .then(() => {
            setState({ step: "success" });
        })
        .catch((error) => {
            setState({ step: "error", error });
        });
}

function setState(nextState) {
    // Видаляємо всіх потомків
    formStatus.innerHTML = "";

    currentState = nextState;
    switch (nextState.step) {
        case "initial":
            break;
        case "pending":
            formStatus.appendChild(spinner);
            break;
        case "success":
            let successMessage = createSuccessMessage();
            formStatus.appendChild(successMessage);
            break;
        case "error":
            let errorMessage = createErrorMessage(nextState.error);
            let retryButton = createRetryButton();
            formStatus.appendChild(errorMessage);
            formStatus.appendChild(retryButton);
            retryButton.addEventListener("click", trySubmit);
            break;
    }
}
```

```jsx
function FormStatus() {
    let [state, setState] = useState({
        step: "initial",
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (state.step === "pending") {
            // Не дозволяємо повторних submit-ів
            return;
        }
        setState({ step: "pending" });
        submitForm()
            .then(() => {
                setState({ step: "success" });
            })
            .catch((error) => {
                setState({ step: "error", error });
            });
    }

    let content;
    switch (state.step) {
        case "pending":
            content = <Spinner />;
            break;
        case "success":
            content = <SuccessMessage />;
            break;
        case "error":
            content = (
                <>
                    <ErrorMessage error={state.error} />
                    <RetryButton onClick={handleSubmit} />
                </>
            );
            break;
    }

    return <form onSubmit={handleSubmit}>{content}</form>;
}
```

### Література

<a href="https://overreacted.io/uk/the-bug-o-notation/">«Bug-O» Нотація</a>
