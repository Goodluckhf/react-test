if [ $1!="--init" ]; then
    kill `cat bin/pid`;
#    echo "test$APPN"
fi

PORT=3011 NODE_ENV=development NODE_PATH=. supervisor -e node,js,json -w app.js,bin/www,routes.js,model,routes bin/www >> log/dev.log 2>&1 &
echo $! > bin/pid