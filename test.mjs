import { CodeCatalystClient as Client, ListSpacesCommand as Command } from "@aws-sdk/client-codecatalyst";
import { fromSso } from "@aws-sdk/token-providers";

(async () => {
  const client = new Client({
    region: "us-west-2",
    token: fromSso({
      profile: "codecatalyst",
    }),
    // Secret config option that probably wasn't on purpose...
    // profile: "codecatalyst"
  });
  // client.middlewareStack.identifyOnResolve(true);
  client.middlewareStack.addRelativeTo((next, context) => args => {
    // console.log(JSON.stringify(context, null, 2));
    return next(args);
  }, {
    toMiddleware: "httpSigningMiddleware",
    relation: "after",
  })
  const command = new Command({});
  console.log({
    response: await client.send(command)
  });
})();
