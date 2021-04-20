FROM deepnote/python:3.8

RUN sudo apt-get update
RUN sudo apt-get upgrade -y

RUN sudo apt-get install -y vim nano
RUN sudo apt-get install zsh -y
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN echo 'zsh' >> ~/.bashrc
RUN echo 'cd /root/work' >> ~/.zshrc