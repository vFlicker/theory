## classnames

```jsx
import cn from "classnames";

cn("menu", "active"); // 'menu active'

let isActive = true;
cn("menu", { active: isActive }); // 'menu active'

isActive = false;
cn("menu", { active: isActive }); // 'menu'
```
