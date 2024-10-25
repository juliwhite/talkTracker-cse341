const Child = require('../models/child'); // Mongoose model

const resolvers = {
  Query: {
    getAllChildren: async () => await Child.find(),
    getChildById: async (_, { id }) => await Child.findById(id),
  },
  Mutation: {
    addChild: async (_, args) => {
      const newChild = new Child(args);
      return await newChild.save();
    },
    updateChild: async (_, { id, ...args }) => {
      return await Child.findByIdAndUpdate(id, args, { new: true });
    },
    deleteChild: async (_, { id }) => {
      await Child.findByIdAndDelete(id);
      return `Child with ID: ${id} deleted successfully`;
    },
  },
};

module.exports = resolvers;