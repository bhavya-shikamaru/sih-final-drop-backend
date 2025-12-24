import mongoose from 'mongoose';
const MONGO_URI =
    process.env.MONGO_URI || 'mongodb://localhost:27017/sih-project';
export async function connectDB(): Promise<void> {
    try {

        // Fires when successfully connected to MongoDB
        mongoose.connection.on('connected', () => {
            console.log('📦 MongoDB connected successfully');
        });

        // Fires when there's a connection error
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });

        // Fires when the connection is lost
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
        });

        /*
         * Handle a graceful shutdown.
         *
         * SIGINT is the signal sent when you press Ctrl+C in the terminal.
         * We want to close the database connection cleanly before exiting,
         * rather than just killing the process abruptly.
         */
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });

        /*
         * Actually connect to MongoDB.
         *
         * mongoose.connect() returns a Promise that resolves when connected.
         * If the connection fails, it throws an error which we catch below.
         */
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        /*
         * If we can't connect to the database, there's no point continuing.
         * The app won't work without a database, so we exit immediately.
         * process.exit(1) means "exit with an error".
         */
        console.error('❌ Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}