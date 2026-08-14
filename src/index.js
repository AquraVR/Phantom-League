export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Test API
    if (url.pathname === "/api/test") {
      return Response.json({
        success: true,
        message: "Phantom League API is online"
      });
    }

    // Serve your website
    return env.ASSETS.fetch(request);
  }
};
