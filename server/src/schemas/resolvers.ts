import   User  from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface LoginUserArgs {
    input: {
        email?: string;
        username?: string;
        password: string;
    }
};

interface AddUserArgs {
    input: {
        email: string;
        username: string;
        password: string;
    }
}

interface SaveBookArgs {
    input: {
        authors: string[];
        description: string;
        title: string;
        bookId: string;
        image: string;
        link: string;
    },
};


const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return  User.findOne(
                    { $or: [
                        {_id: context.user._id},
                        {username: context.user.username},
                    ]
                });
            };

            throw new AuthenticationError('Could not authenticate user');
        }, 
    },
    Mutation: {
        login: async (_parents: any, { input }: LoginUserArgs) => {
            const { email, username, password } = input;
            const user = await User.findOne(
                { $or: [
                    { email },
                    { username}
                ]
            });

            if (!user) {
                throw new AuthenticationError('Could not authenticate user');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user');
            }

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },

        addUser: async (_parents: any, { input }: AddUserArgs) => {
            console.log(input);
            const user = await User.create(input);
            
            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },

        saveBook: async (_parents: any, { input }: SaveBookArgs, context: any) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true}
                );
            };

            throw AuthenticationError;
        },

        removeBook: async (_parents: any, { bookId }:any, context: any ) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
            };

            throw AuthenticationError;
        },
    }
};

export default resolvers;
