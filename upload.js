let files = [1, 2, 3, 4, 5];

let tasks = [];
files.forEach(file => {
    tasks.push(upload(file));
});

let results = Promise.all(tasks);

results.then(data =>
    console.log(data)
);

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function s3(name) {
    return new Promise((resolve, reject) => {
        if (name) {
            resolve({
                success: true,
                message: "Uploaded in S3"
            });
        } else {
            reject({
                success: false,
                message: "Error in S3"
            });
        }
    });
}

function dynamoDb(s3Response) {
    return new Promise((resolve, reject) => {
        if (s3Response.success) {
            resolve("Saved in dynamoDb");
        } else {
            reject("Error in DynamoDB");
        }
    });
}

async function upload(name) {
    const s3Response = await s3(name);
    const dynamoDbResponse = await dynamoDb(s3Response);

    return s3Response;
}
