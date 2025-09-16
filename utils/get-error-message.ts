export default function getErrorMessage(error: any, mes: string = 'Unexpected Error') {
    let message: string = '';
    if (typeof error === 'string') {
        message = error;
    } else if (error instanceof Error) {
        message = error.message;
    } else if (error?.message) {
        message = error.message;
    } else {
        message = mes;
    }

    return message;
}
