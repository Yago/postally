module.exports = (args, done) => {
  setTimeout(() => {
    console.log(args);
    done();
  }, 1000);
};