## Git

### Глобальна конфігурація користувача

```
git config --global user.name "FIRST_NAME LAST_NAME"
git config --global user.email "MY_NAME@example.com"
```

### GitHub SSH

1. Перейти у директорію `~/.ssh`
2. Виконати команду `ssh-keygen -t ed25519 -C "flickervladislav@gmail.com"`
3. Завантажити публічний ключ на GitHub
4. Перевірити чи впізнає нас GitHub `ssh -T -i ~/.ssh/github-12-08-2022 git@github.com`
5. Створити файл `config` з описом

```
Host github.com
IdentityFile ~/.ssh/{private_key}
```
