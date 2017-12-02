if [ $1!="--init" ]; then
    kill `cat bin/pid`;
#    echo "test$APPN"
fi

NODE_ENV=development NODE_PATH=. supervisor -e node,js,json -w app.js,server.js,routes.js,model,routes,conf,api server.js >> log/dev.log 2>&1 &
echo $! > bin/pid