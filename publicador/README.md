# Publicação automática no Instagram

Publica os 60 posts nos horários do calendário usando a API oficial da Meta
(Instagram Graph API), rodando no GitHub Actions. Não depende do PC ligado.

## Como funciona

- `agenda.json` — data e hora de cada post (gerado por `gerar-agenda.mjs`).
- `jpg/` — artes em JPEG (a API do Instagram não aceita PNG), geradas por `converter-jpg.ps1`.
- `publicar.mjs` — a cada execução, publica **um** post: o mais antigo cujo horário já passou
  e que ainda não está em `publicados.json`.
- `.github/workflows/publicar-instagram.yml` — roda o script a cada 15 minutos (e às 08h15, 13h30 e 19h25) e grava
  `publicados.json` no repositório depois de cada publicação.

O Instagram busca a imagem por URL pública, por isso o repositório no GitHub precisa ser
**público** (as artes vão ser públicas no Instagram de qualquer forma). O token fica nos
*secrets* do GitHub e nunca aparece no código.

Os horários são 08h15, 13h30 e 19h25 (Brasília), definidos em `HORARIOS` no `gerar-agenda.mjs`.
O agendamento do GitHub às vezes atrasa alguns minutos, então cada post sai entre o horário
marcado e ~15 min depois.

## Configuração (uma vez só)

### 1. Token da Meta (System User, não expira)

1. Acesse **developers.facebook.com → Meus apps → Criar app**, tipo **Empresa**, vinculado
   ao portfólio empresarial da Taskcheck.
2. Em **business.facebook.com → Configurações → Usuários → Usuários do sistema**, crie um
   usuário do sistema com função **Admin**.
3. No usuário do sistema, **Atribuir ativos**: a Página do Facebook da Taskcheck, a conta do
   Instagram e o app criado no passo 1 (controle total).
4. Clique em **Gerar token**, escolha o app, expiração **Nunca** e marque as permissões:
   `instagram_basic`, `instagram_content_publish`, `pages_show_list`,
   `pages_read_engagement`, `business_management`.
5. Copie o token (ele só aparece uma vez).

### 2. ID da conta do Instagram

No **Graph API Explorer** (developers.facebook.com/tools/explorer), cole o token e faça:

```
GET me/accounts?fields=name,instagram_business_account{id,username}
```

O `instagram_business_account.id` é o `IG_USER_ID`.

### 3. Testar no PC (opcional, recomendado)

```powershell
$env:IG_USER_ID = "..."; $env:META_TOKEN = "..."; node publicador/publicar.mjs --verificar
```

Deve mostrar `Conta @taskcheck...`. Se der erro de permissão, confira os ativos atribuídos
ao usuário do sistema.

### 4. GitHub

1. Crie um repositório **público** vazio em github.com (ex.: `taskcheck-instagram`).
2. Envie esta pasta:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/taskcheck-instagram.git
   git push -u origin main
   ```
3. No repositório: **Settings → Secrets and variables → Actions → New repository secret**:
   - `IG_USER_ID` — ID do passo 2
   - `META_TOKEN` — token do passo 1
4. Aba **Actions → Publicar no Instagram → Run workflow** com "Apenas simular" marcado:
   o log mostra o post que sairia. Depois rode sem simular (ou espere o próximo horário).

## Uso no dia a dia

- **Ver o que vai sair:** `node publicador/publicar.mjs --dry-run`
- **Refazer a agenda:** `node publicador/gerar-agenda.mjs AAAA-MM-DD [HH:MM] [primeiro-post] [--primeiro-agora]`,
  commit e push. Ex.: `node publicador/gerar-agenda.mjs 2026-10-19 19:25 41 --primeiro-agora` publica o
  post 41 na próxima execução e segue do 42 em diante a partir das 19h25 de 19/10.
- **Mudar um horário específico:** edite `agenda.json` (formato `2026-10-20T09:00:00-03:00`).
- **Pular um post:** adicione o número dele em `publicados.json`, ex. `"7": {"pulado": true}`.
- **Pausar tudo:** Actions → Publicar no Instagram → `...` → **Disable workflow**.
- **Arte ou legenda alterada:** rode `node gerador/build.mjs N`, depois
  `powershell -ExecutionPolicy Bypass -File publicador\converter-jpg.ps1`, commit e push.

Antes de editar no PC, rode `git pull` para trazer o `publicados.json` atualizado pelo GitHub.
