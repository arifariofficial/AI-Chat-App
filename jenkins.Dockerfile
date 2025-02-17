FROM jenkins/jenkins:lts

USER root

# Install Docker CLI
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://get.docker.com -o get-docker.sh \
    && sh get-docker.sh \
    && rm get-docker.sh

# Install Docker Compose
RUN curl -L "https://github.com/docker/compose/releases/download/2.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose

# Install Plugins using jenkins-plugin-cli
RUN jenkins-plugin-cli --plugins \
    generic-webhook-trigger \
    git \
    workflow-aggregator

# Configure Jenkins admin credentials
COPY security.groovy /usr/share/jenkins/ref/init.groovy.d/security.groovy

# Switch back to Jenkins user
USER jenkins
