# Node API Server Starter Kit

This starter kit contains everything you'll need to create your very own Node-based API server, using Express and configured to serve JSON files for data. It's all wrapped up in a nice little TypeScript package for you.

## Why an API server that serves JSON files?

Driven, as always, by the need to solve a problem I had on how to create a dummy API server that could return various bits of data in a realistic fashion (thus, removing the need to hard code everything), I went down the path of creating a dual project: one for the main React app I was using, with an attached API server using Express (i.e. this project).

## Using the API server

I'll run over the basics here to get you up and running, but I wrote an [accompanying article](https://robkendal.co.uk/blog/build-a-restful-node-api-server-using-json-and-typescript/) on this very tool that is much more comprehensive and covers many more use cases. You can [read the full Node-based API server article](https://robkendal.co.uk/blog/build-a-restful-node-api-server-using-json-and-typescript/) on my website.

### Getting started

First things first, you'll need to fork or clone this repository, and run the install command of your choosing (preferrably pnpm):

```
pnpm install
```

And that's really about it (see, I said it was simple!). To fire up the server and have it do stuff, you'll need to start it with the familiar command:

```
pnpm start
```

### Accessing the server and returning data

The server should be running by now, and you can visit `http://localhost:8080` to see it in action.

By default, it doesn't return a great deal, but if you visit `http://localhost:8080/users` -- which will automatically issue a GET request to our running API server -- you'll see a simple JSON object populated with some dummy user data.

## Module aliases

You'll notice that we have some convenient path imports dotted around the place, such as in the `server/routes/users.ts` file. We reference `@controllers/users` right at the top of the file, but how is this working. Well, TypeScript gives us a nice `paths` property in the `tsconfig.json` file that we can use to reference longer, upper folder chains using a shortcut string. For example, instead of `import thing from '../../../../path/to/module`, we can user `import thing from '@modules/thing`.

We add in our aliases in the `tsconfig.json` file like this:

```
"paths": {
  "@controllers/*": ["./server/controllers/*"],
  "@routes/*": ["./server/routes/*"],
  "@data/*": ["./data/*"]
}
```

However, because we're in a pure Node environment, this won't work when it comes to running the project. Sad times 😭. This is because of how the module resolution works within Node and because we're using nodemon to run our server. If we were using a packager or bundler like Rollup, Vite, or Webpack, we'd be set.

In our case, we're using the fabulous [Module Aliases](https://www.npmjs.com/package/module-alias) project which helps us get around the path aliases issue in Node environments.

This requires a little extra work in that we have to import the project into our root file, `server.ts`, like this:

```
import 'module-alias/register';
```

Next, we have to duplcate our module paths into our `package.json` file like this:

```
"_moduleAliases": {
  "@controllers": "./server/controllers",
  "@routes": "./server/routes",
  "@data": "./data"
},
```

If you want to expand on this starter kit and add new module alias paths, then just keep this in mind 👍.

## Expanding the server

This starter kit is really designed as a kick off point for your own API adventures. If you would like to extend the functionality for your own purposes then you need to do these three things:

1. Add a new JSON file with your relevant data to the main data entry point for the project, `./data`.
2. Add a new controller file into `./server/controllers/[your controller file].ts` -- this is where you'll physically handle interacting with files or retrieving data.
3. Add a route file that will access this controller and define your routes into `./server/routes/[your route file].ts` -- hint: use the `./server/routes/users.ts` as a guide.
4. Add your new route file into the main routes file located at `./server/routes/index.ts`.
