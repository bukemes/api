import mongoose from 'mongoose';

const { Schema } = mongoose;

const itemsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

// export { itemsSchema };
export default itemsSchema;
