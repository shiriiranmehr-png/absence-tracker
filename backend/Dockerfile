FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY src ./src
COPY tsconfig.json ./
COPY database ./database

# Build TypeScript
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
