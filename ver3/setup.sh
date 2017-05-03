if [ "$(uname)" == "Darwin" ]; then
  sudo npm i
else
  npm i
fi

grunt
