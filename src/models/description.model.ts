import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema(
    {
        time: {
            type: Date,
            default: Date.now,
        },
        content: {
            type: String,
        },
        files: {
            type: Array,
        },
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        },
        isDone: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false },
);

const Description = mongoose.model('Description', DescriptionSchema);

export default Description;
