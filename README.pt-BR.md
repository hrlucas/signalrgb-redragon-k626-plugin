# 🚀 SignalRGB Redragon Ashe K626 Plugin

<p align="center">
  <a href="https://github.com/hrlucas">
    <img src="https://img.shields.io/badge/GitHub-hrlucas-181717?style=for-the-badge&logo=github">
  </a>
  <a href="https://www.linkedin.com/in/lucas-hochmann-rosa">
    <img src="https://img.shields.io/badge/LinkedIn-Lucas_Hochmann_Rosa-0A66C2?style=for-the-badge&logo=linkedin">
  </a>
  <a href="https://signalrgb.com/">
    <img src="https://img.shields.io/badge/SignalRGB-Plugin-ff6b00?style=for-the-badge">
  </a>
  <a href="#-licença">
    <img src="https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge">
  </a>
</p>

<p align="center">
  <a href="README.md">English</a>
</p>

> Desenvolvi este plugin para adicionar suporte ao **teclado Redragon Ashe RGB K626-KB-B PT-BROWN ABNT2** no SignalRGB, com mapeamento físico de LEDs feito especificamente para o layout brasileiro. O projeto pertence a **Lucas Hochmann Rosa / hrlucas.dev**, está aberto para melhorias da comunidade e é distribuído sob licença MIT, mantendo atribuição ao autor.

---

## 📌 Visão Geral

O **signalrgb-redragon-k626-plugin** permite que o SignalRGB reconheça e controle o teclado mecânico **Redragon Ashe K626 ABNT2**, usando o protocolo base Sinowealth e um layout fixo de 79 LEDs mapeados manualmente.

---

## 🧠 Funcionalidades

- Identificação do dispositivo por VID/PID (`0x258A` / `0x0049`).
- Validação do endpoint HID pela interface `1`.
- Mapeamento físico ABNT2 com 79 LEDs controláveis.
- Layout visual de 18 x 5 pontos no canvas do SignalRGB.
- Modo **Canvas** para usar o efeito ativo do SignalRGB.
- Modo **Forced** para aplicar uma cor fixa ao teclado.
- Cor configurável para desligamento/suspensão.
- Metadados de autor, documentação e imagem do dispositivo.
- Ignora funções secundárias de Fn, como PrtSc, ScrLk e Pause, por não terem LEDs dedicados no mapeamento.

---

## 🏗️ Arquitetura

```text
signalrgb-redragon-k626-plugin/
│
├── Redragon_Ashe_K626.js       # Plugin SignalRGB do Redragon Ashe K626 ABNT2
├── assets/
│   ├── .gitkeep                # Mantém a pasta de assets versionada
│   └── Redragon-Ashe-K626.png  # Imagem do teclado para documentação/repositório
├── README.md                   # Documentação principal em inglês
├── README.pt-BR.md             # Documentação em português do Brasil
└── LICENSE                     # Licença MIT
```

### Organização

- **Redragon_Ashe_K626.js**: identificação do dispositivo, parâmetros configuráveis, mapeamento dos LEDs e envio dos pacotes RGB.
- **assets/**: arquivos visuais do projeto.
- **LICENSE**: termos de uso, modificação e distribuição sob MIT.

---

## 🛠️ Tecnologias

- JavaScript ES Modules
- SignalRGB Plugin API
- HID report via `device.send_report`
- Protocolo base Sinowealth
- Redragon Ashe RGB K626-KB-B PT-BROWN ABNT2

---

## ⚙️ Requisitos

- Windows com SignalRGB instalado.
- Teclado **Redragon Ashe RGB K626-KB-B PT-BROWN ABNT2**.
- Acesso à pasta local de plugins do SignalRGB.

> Este plugin foi desenvolvido e mapeado para o K626 ABNT2. Outros modelos, revisões ou layouts podem exigir alteração do VID/PID, endpoint, índices físicos dos LEDs ou layout visual.

---

## 🔧 Instalação

Copie o arquivo do plugin:

```txt
Redragon_Ashe_K626.js
```

para a pasta local de plugins do SignalRGB:

```txt
C:\Users\SEU_USUARIO\Documents\WhirlwindFX\Plugins
```

Depois feche o SignalRGB completamente pela bandeja do Windows e abra novamente.

---

## ▶️ Uso

No SignalRGB, selecione o dispositivo reconhecido como **Redragon Ashe K626 ABNT2** e configure os parâmetros disponíveis:

| Parâmetro | Descrição |
| --------- | --------- |
| `Lighting Mode` | Alterna entre o efeito do canvas do SignalRGB e uma cor fixa |
| `Forced Color` | Cor aplicada quando o modo `Forced` está ativo |
| `Shutdown Color` | Cor enviada ao teclado durante desligamento ou suspensão |

---

## 🧩 Detalhes do Dispositivo

| Campo | Valor |
| ----- | ----- |
| Modelo | Redragon Ashe RGB K626-KB-B PT-BROWN |
| Layout físico | ABNT2 |
| LEDs mapeados | 79 |
| VID | `0x258A` |
| PID | `0x0049` |
| Interface validada | `1` |
| Protocolo base | Sinowealth |
| Tamanho no canvas | `18 x 5` |

---

## 🖼️ Imagem do Dispositivo

O repositório mantém a imagem do teclado em `assets/Redragon-Ashe-K626.png` para documentação e organização visual do projeto.

O plugin usa diretamente a URL GitHub Raw para que o SignalRGB receba o PNG com a transparência e a formatação esperadas:

```js
const DEVICE_IMAGE_URL = "https://raw.githubusercontent.com/hrlucas/signalrgb-redragon-k626-plugin/main/assets/Redragon-Ashe-K626.png";
```

---

## 🧪 Validação Local

Após instalar o arquivo, reinicie o SignalRGB e confirme:

- O teclado aparece como **Redragon Ashe K626 ABNT2**.
- O modo **Canvas** acompanha o efeito ativo do SignalRGB.
- O modo **Forced** aplica a cor escolhida em todas as teclas mapeadas.
- A tecla Enter ABNT2 aparece visualmente em duas linhas, mas usa apenas um LED físico.
- As teclas sem LED dedicado não aparecem como LEDs independentes.

---

## 🔐 Boas Práticas do Repositório

- Manter `README.md`, `README.pt-BR.md` e `LICENSE` sempre atualizados.
- Não publicar arquivos com credenciais, tokens ou dados sensíveis.
- Usar branches e pull requests para alterações relevantes.
- Habilitar Dependabot alerts, secret scanning, proteção de push e code scanning no GitHub quando o repositório estiver publicado.
- Usar Git LFS caso imagens ou assets grandes passem a fazer parte do histórico do projeto.

---

## 📄 Licença

Licenciado sob MIT. Você pode usar, modificar e distribuir este projeto, mantendo o aviso de copyright e atribuindo crédito a **Lucas Hochmann Rosa / hrlucas.dev**.

Este é um plugin independente da comunidade. As marcas SignalRGB e Redragon pertencem aos seus respectivos proprietários.

---

## 👨‍💻 Autor

**Lucas Hochmann Rosa / hrlucas.dev** — Desenvolvedor Full Stack

- GitHub: https://github.com/hrlucas
- LinkedIn: https://www.linkedin.com/in/lucas-hochmann-rosa-456bb7339/
- Licença: MIT (cite o autor ao usar ou derivar o projeto)
