import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { Application } from 'express';

const openapiOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bukemes API',
            version: '1.0.0',
            description: 'Booking Content Management System',
        },
        servers: [{url:'http://localhost:9001'}],
        components:{
            securitySchemes: {
                bearerAuth:{
                    type: 'http',
                    scheme: 'bearer',
                    bearerformat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        host: 'localhost:9001',
        basePath: '/api/v1',
    },
    apis: ['./src/routers/*.ts','./src/models/*.ts','./src/controllers/*.ts'],
};

const openapiSpecification = swaggerJSDoc(openapiOptions);

export default openapiSpecification;

// export default function initializeSwagger(app: Application) {
//     app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));
// }