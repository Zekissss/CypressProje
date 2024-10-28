FROM cypress/included:12.7.0

WORKDIR /e2e

COPY package.json package-lock.json ./
RUN npm install  # Proje bağımlılıklarını yükler

COPY . .  

CMD ["npx", "cypress", "run"]  # Cypress testlerini başlatır
