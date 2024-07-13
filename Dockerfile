FROM node:19.5.0


# referencing docker compose <
ENV owner ${owner}
ENV tokenOctokit ${tokenOctokit}
ENV linkGithubUsers ${linkGithubUsers}
ENV linkOctokitConfig ${linkOctokitConfig}

# >


WORKDIR /app
COPY . .
RUN npm install


CMD ["node", "dist/app.js"]