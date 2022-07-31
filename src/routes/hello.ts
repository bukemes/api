
import { Application, Request, Response } from 'express';
import { OpenApi, textPlain } from 'ts-openapi';

function hello(req: Request, res: Response) {
    res.send('OpenAPI Test - Hello World');
}

export function initHello(app: Application, openApi: OpenApi) {
    app.get('/hello', hello);

    // declare our API
    openApi.addPath(
        '/hello', // this is API path
        {
            // API method
            get: {
                description: 'Hello world', // Method description
                summary: 'Demo get request to show how to declare APIs', // Method summary
                operationId: 'get-hello-op', // an unique operation id
                responses: {
                    // here we declare the response types
                    200: textPlain('Successful Operation'),
                },
                tags: ['Dummy Apis'], // these tags group your methods in UI
            },
        },
        true // make method visible
    );
}