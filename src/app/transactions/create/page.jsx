import TransactionForm from "@/app/transactions/_component/TransactionForm";
import prisma from "@/lib/db/prisma";
import Categories from "../_component/Categories";
import Form from "@/components/common/Form";

const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    const formatCategories = categories.map((category) => {
      return {
        label: category.name,
        value: category.id,
      };
    });
    return { categories: formatCategories };
  } catch (error) {
    return { error: error };
  }
};

export default async function CreatePage() {
  // const { categories, error } = await getCategories();

  // if (!categories) {
  //   return <div>{JSON.stringify(error)}</div>;
  // }
  return <Form />;
}
