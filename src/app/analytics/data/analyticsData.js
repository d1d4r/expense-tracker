export const GetTotalIncomeExpenseOverTime = async (year) => {
  if (!year) {
    year = 2024;
  }
  try {
    const results = await prisma.$queryRaw`SELECT
        YEAR(createdAt) AS year,
        MONTHNAME(createdAt) AS month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
        FROM transaction
        WHERE YEAR(createdAt) = ${year}
        GROUP BY YEAR(createdAt), MONTH(createdAt)
        ORDER BY year, month;`;

    const formatedDatas = results.map((data) => {
      return {
        ...data,
        total_income: +data.total_income,
        total_expense: +data.total_expense,
      };
    });
    return { data: JSON.parse(JSON.stringify(formatedDatas)) };
  } catch (error) {
    return { error: error.message };
  }
};

export const GetIncomeExpenseByMonth = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT
        YEAR(createdAt) AS year,
        MONTHNAME(createdAt) AS month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
        FROM transaction
        GROUP BY YEAR(createdAt), MONTH(createdAt)
        ORDER BY year, month;`;

    return { data: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    return { error: error.message };
  }
};

export const getCategoryIncomeExpense = async () => {
  try {
    const results = await prisma.$queryRaw`WITH ranked_transactions AS (
          SELECT
            t.type,
            c.name AS category,
            SUM(t.amount) AS total_amount,
            RANK() OVER (PARTITION BY t.type ORDER BY total_amount DESC) AS rank
          FROM transaction t
          INNER JOIN category c ON t.categoryId = c.id
          GROUP BY t.type, c.name
        )
        SELECT *
        FROM ranked_transactions
        WHERE rank <= 5;`;

    const formatedResults = results.map((result) => {
      return {
        ...result,
        total_amount: +result.total_amount,
      };
    });

    const expenseTransactionType = [];
    const incomeTransactionType = [];

    formatedResults.map((result) =>
      result.type === "INCOME"
        ? incomeTransactionType.push(result)
        : expenseTransactionType.push(result)
    );

    return {
      data: {
        expenseData: jsonSerialize(expenseTransactionType),
        incomeData: jsonSerialize(incomeTransactionType),
      },
    };
  } catch (error) {
    return { error: error.message };
  }
};
export const GetAverageTransactionAmountByCategory = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT
        c.name AS category,
          AVG(t.amount) AS average_amount
          FROM transaction t
          INNER JOIN category c ON t.categoryId = c.id
          GROUP BY c.name
          ORDER BY average_amount DESC;`;

    return { data: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    return { error: error.message };
  }
};
