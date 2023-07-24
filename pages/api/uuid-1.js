import prisma from '../../utils/prisma';

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
    const sites = await prisma.orders.findMany({
      where: {
        createdBy: userId,
      },
    });

    console.log(sites);

    res.status(200).json(sites);
  } catch (error) {
    console.error("Failed to fetch sites:", error);
    res.status(500).json({ error: "Failed to fetch sites" });
  }
}