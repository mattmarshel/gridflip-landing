export async function GET() {
  return Response.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: "DDUZ7AYSFE.com.gridflip.app",
          paths: ["/c/*"],
        },
      ],
    },
  });
}
