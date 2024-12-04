module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel', 
      'react-native-iconify/plugin', 
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // Use "@env" for importing environment variables
          path: '.env',       // Path to the .env file
          safe: false,        // Optional: Enforces variables to match a .env.example file
          allowUndefined: true, // Allow undefined variables to be used
        },
      ],
    ],
  };
};
