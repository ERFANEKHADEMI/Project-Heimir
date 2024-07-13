FROM node:19.5.0


# referencing docker compose <
ENV owner ${owner}
ENV tokenOctokit ${tokenOctokit}
ENV linkGithubUsers ${linkGithubUsers}
ENV linkOctokitConfig ${linkOctokitConfig}

# >


WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install


CMD ["node", "app.js"]