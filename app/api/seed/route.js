import { seedTransactions } from "@/actions/seeds";

export async function GET() {
  const result = await seedTransactions();
  console.log(result)
  return Response.json(result);
}