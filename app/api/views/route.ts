// import clientPromise from "@/app/lib/mongodb";

// export async function POST() {
//   const client = await clientPromise;

//   const db = client.db("portfolio");

//   const collection = db.collection("views");

//   const existing = await collection.findOne({
//     name: "portfolio-views",
//   });

//   if (!existing) {
//     await collection.insertOne({
//       name: "portfolio-views",
//       count: 1,
//     });

//     return Response.json({
//       count: 1,
//     });
//   }

//   await collection.updateOne(
//     { name: "portfolio-views" },
//     {
//       $inc: {
//         count: 1,
//       },
//     }
//   );

//   const updated = await collection.findOne({
//     name: "portfolio-views",
//   });

//   return Response.json({
//     count: updated?.count || 0,
//   });
// }

// export async function GET() {
//   const client = await clientPromise;

//   const db = client.db("portfolio");

//   const collection = db.collection("views");

//   const views = await collection.findOne({
//     name: "portfolio-views",
//   });

//   return Response.json({
//     count: views?.count || 0,
//   });
// }