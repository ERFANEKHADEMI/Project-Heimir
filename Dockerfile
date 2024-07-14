FROM node:19.5.0


# referencing docker compose <
ENV octokitFile ${octokitFile}
ENV octokitToken ${octokitToken}
ENV octokitOwner ${octokitOwner}
ENV octokitBranch ${octokitBranch}
ENV urlGitHubUsers ${linkGithubUsers}

# >


WORKDIR /app
COPY . .
RUN npm install


CMD ["node", "dist/app.js"]