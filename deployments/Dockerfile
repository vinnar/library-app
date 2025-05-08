# Use an official Node base image
FROM node:lts-alpine3.21

# Set the working directory
WORKDIR /workspace

# Install zsh, oh-my-zsh and other utilities
# RUN apt-get update && apt-get install -y zsh git wget
# RUN sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"

RUN apk add zsh curl wget git
RUN sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"

# Change shell to zsh
SHELL ["/bin/zsh", "-c"]

# Clean up
# RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the default shell for the container
CMD ["zsh"]

