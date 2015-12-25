var child_process = require("child_process");
var Promise = require("bluebird");
module.exports = function (e) {
    return new Promise(function (resolve, reject) {
        child_process.exec(__dirname + "/../scripts/linux/network.sh", function (error, stdout, stderr) {
            if (error && error !== null) {
                reject(error);
            }
            else if (stderr) {
                reject(stderr);
            }
            else {
                resolve(JSON.parse(stdout + ""));
            }
        });
    });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLGFBQWEsV0FBVyxlQUFlLENBQUMsQ0FBQztBQUNoRCxJQUFPLE9BQU8sV0FBVyxVQUFVLENBQUMsQ0FBQztBQUdyQyxpQkFBUyxVQUFTLENBQU07SUFFcEIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07UUFDdkMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsOEJBQThCLEVBQ3pELFVBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQyxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7SUFFWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyIsImZpbGUiOiJsaWIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hpbGRfcHJvY2VzcyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuaW1wb3J0IFByb21pc2UgPSByZXF1aXJlKFwiYmx1ZWJpcmRcIik7XG5cblxuZXhwb3J0ID0gZnVuY3Rpb24oZTogYW55KSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNoaWxkX3Byb2Nlc3MuZXhlYyhfX2Rpcm5hbWUgKyBcIi8uLi9zY3JpcHRzL2xpbnV4L25ldHdvcmsuc2hcIixcbiAgICAgICAgICAgIGZ1bmN0aW9uKGVycm9yLCBzdGRvdXQsIHN0ZGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciAmJiBlcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RkZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChzdGRlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShzdGRvdXQrXCJcIikpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICB9KTtcbn07XG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9