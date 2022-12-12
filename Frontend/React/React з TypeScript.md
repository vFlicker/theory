## React з TypeScript

### React child

```tsx
export declare interface AppProps {
    /** Найкращий тип, приймає все, що React може відобразити */
    children?: React.ReactNode;

    /** Один елемент React */
    childrenElement: JSX.Element; // A single React element
}
```

### Custom hooks

```tsx
import { useState } from "react";

export function useLoading() {
    const [isLoading, setState] = useState(false);
    const load = (aPromise: Promise<any>) => {
        setState(true);
        return aPromise.finally(() => setState(false));
    };

    /**
     * [isLoading, load] as const;
     * визначає [boolean, typeof load]
     * замість (boolean | typeof load)[]
     */
    return [isLoading, load] as const;
}
```

### Simulating Nominal Types

```tsx
function OrderID(id: string) {
    return id as OrderID;
}

function UserID(id: string) {
    return id as UserID;
}

function queryForUser(id: UserID) {}
queryForUser(OrderID("foobar")); // Error, Argument of type 'OrderID' is not assignable to parameter of type 'UserID'
```
