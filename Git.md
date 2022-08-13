## Git

### Generate GitHub SSH

1. Перейти у директорію `~/.ssh`
2. Виконати команду `ssh-keygen -t ed25519 -C "your_email@example.com"`
3. Перевірити чи впізнає нас GitHub `ssh -T -i ~/.ssh/github-12-08-2022 git@github.com`
4. Створити файл `config` з описом

```
Host github.com
IdentityFile ~/.ssh/{private_key}
```
