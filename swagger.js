const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Talk Tracker API',
        description: 'API for managing children talks in Primary.',
    },
    host: 'localhost:8080',
    schemes: ['http'],
    components: {
        schemas: {
            Child: {
                type: 'object',
                required: ['firstName', 'lastName', 'birthday', 'class', 'favoriteTreat'],
                properties: {
                    firstName: {
                        type: 'string',
                        description: 'First name of the child',
                        example: 'John',
                    },
                    lastName: {
                        type: 'string',
                        description: 'Last name of the child',
                        example: 'Wells',
                    },
                    birthday: {
                        type: 'string',
                        description: 'Birthday of the child',
                        example: '2015-01-01',
                    },
                    class: {
                        type: 'string',
                        description: 'Class of the child',
                        example: 'Sumbeam',
                    },
                    favoriteTreat: {
                        type: 'string',
                        descriptiron: 'Favorite od the child',
                        example: 'Chocalate chip cookie',
                    },
                    talksGiven: {
                        type: 'number',
                        description: 'Number of talks the child has given in Primary',
                        example: 3,
                        default: 0,
                    },
                },
            },
        }
    }
};

const outputFile = './swagger-output.json'; // It generate swagger file
const endpointsFiles = ['./routes/children.js'] // add routes files

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js'); // main application entry point.
})