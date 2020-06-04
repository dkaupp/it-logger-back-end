const request = require("supertest");
const { Log } = require("../../models/logs");
const { Tech } = require("../../models/techs");

let server;

describe("/api/logs", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await Log.remove({});
    await Tech.remove({});
    server.close();
  });
  describe("get /", () => {
    it("should return all logs", async () => {
      await Log.collection.insertMany([
        { name: "logtest1" },
        { name: "logtest2" },
      ]);

      const res = await request(server).get("/api/logs");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "logtest1"));
    });
  });
  describe("/get /:id", () => {
    it("should return 404 error", async () => {
      const res = await request(server).get("/api/logs/efwlnffe");
      expect(res.status).toBe(404);
    });
    it("should return the requested log if valid id", async () => {
      const log = new Log({
        message: "sdfafds",
        tech: {
          name: "something",
          _id: "42243540",
        },
      });

      await log.save();

      const res = await request(server).get("/api/logs/" + log._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", log.name);
    });
  });
  describe("/post /", () => {
    it("should return 401 if client if not logged in", async () => {
      const res = await request(server)
        .post("/api/logs")
        .send({ message: "dsfnodn" });

      expect(res.status).toBe(401);
    });
    it("should return 400 if invalid tech is not provided", async () => {
      const token = new Tech().generateAuthToken();
      const res = await request(server)
        .post("/api/logs")
        .set("x-auth-token", token)
        .send({
          message: "sdfafds",
        });

      expect(res.status).toBe(400);
    });
    it("should return 400 if message not provided", async () => {
      const token = new Tech().generateAuthToken();
      const res = await request(server)
        .post("/api/logs")
        .set("x-auth-token", token)
        .send({
          tech: {
            name: "something",
            _id: "42243540",
          },
        });

      expect(res.status).toBe(400);
    });
    it("should return 400 if message is more than 100 characters.", async () => {
      const token = new Tech().generateAuthToken();

      const message = new Array(103).join("a");
      const res = await request(server)
        .post("/api/logs")
        .set("x-auth-token", token)
        .send({
          message,
          tech: {
            name: "addffd",
            _id: "42243540",
          },
        });

      expect(res.status).toBe(400);
    });
    it("should save the log if it is valid.", async () => {
      let tech = new Tech({
        username: "fffffff",
        password: "1234567",
        name: "ramdomname",
      });
      const token = tech.generateAuthToken();
      tech = await tech.save();

      console.log(tech);

      const res = await request(server)
        .post("/api/logs")
        .set("x-auth-token", token)
        .send({
          message: "this is for test only",
          tech: tech._id,
        });

      expect(res.status).toBe(200);
    });
  });
});
