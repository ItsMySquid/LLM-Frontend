Zeker! Hier is een `README.md` die past bij jouw **frontend React-applicatie** die **verbindt met jouw API**:

---

# Hypixel Skyblock Guide - Frontend

Dit project is een **React** frontend die communiceert met de [Hypixel Skyblock Guide API](https://github.com/jouwgebruikersnaam/hypixel-skyblock-guide-api).  
De applicatie biedt een gebruikersvriendelijke interface om te **chatten** met een AI-gebaseerde gids voor **Hypixel Skyblock**.

## ✨ Functies
- Chatinterface voor communicatie met de Skyblock Guide API.
- Toont antwoorden van het Azure OpenAI-model.
- Ondersteunt avatars en chatgeschiedenis.
- Stijlvol en responsief ontwerp met **TailwindCSS** (indien gebruikt).
- Verbindt automatisch met de backend API.

## 🛠️ Gebruikte technologieën
- [React](https://react.dev/)
- [Axios](https://axios-http.com/) (voor API-verzoeken)
- [TailwindCSS](https://tailwindcss.com/) (optioneel, als je Tailwind gebruikt)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (voor chatgeschiedenis)

## 📦 Installatie

1. **Clone de repository**:
   ```bash
   git clone https://github.com/ItsMySquid/LLM-Frontend
   cd LLM-Frontend
   ```

2. **Installeer de dependencies**:
   ```bash
   npm install
   ```

3. **Zorg voor een `.env` bestand** in de root met de volgende variabele:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   > **Belangrijk**: Vervang `http://localhost:3000` met de URL waar jouw backend API draait als je deze hebt gedeployed.

4. **Start de ontwikkelserver**:
   ```bash
   npm run dev
   ```

## 🧠 Structuur
- `src/components/`: Bevat alle losse componenten zoals ChatWindow, Message, InputField.
- `src/services/`: API services voor het communiceren met de backend.
- `src/App.jsx`: Hoofdcomponent waarin de chatinterface wordt opgebouwd.
- `public/`: Bevat statische bestanden zoals icons of favicon.
- `.env`: Frontend environment variabelen.

## 🚀 Deployment
Voor productie kun je de app builden met:
```bash
npm run build
```
En deployen naar platforms zoals:
- Vercel
- Netlify
- Azure Static Web Apps
- Cloudflare Pages

## ⚠️ Belangrijke opmerkingen
- De frontend werkt alleen goed als de backend correct draait en bereikbaar is.
- De API URL moet overeenkomen met de server waarop de Hypixel Skyblock Guide API actief is.
- Bewaar `.env`-bestanden altijd buiten je publieke GitHub-repository!

## 📸 Screenshots 
![Screenshot_2025-04-27_195307](https://github.com/user-attachments/assets/d4eb2267-0f0e-4246-ad7d-88f2207fa544)


---
