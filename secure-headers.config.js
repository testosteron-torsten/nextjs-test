module.exports = {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: "'self'",
        scriptSrc: "'self'",
        styleSrc: "'self'",
        imgSrc: '*',
        fontSrc: '*',
        mediaSrc: '*',
      },
    },
  };
  