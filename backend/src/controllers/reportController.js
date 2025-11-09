import Transaction from '../models/transactionModel.js';
import pdf from 'html-pdf'; // Import html-pdf
import Papa from 'papaparse';

// Helper functions for date calculations
const getStartAndEndDate = (timePeriod) => {
  const now = new Date();
  let startDate, endDate = now;

  switch (timePeriod) {
    case 'daily':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'weekly':
      startDate = new Date(now.setDate(now.getDate() - now.getDay())); // Start of current week (Sunday)
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // End of current week (Saturday)
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'monthly':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of current month
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'alltime': // Added alltime
      startDate = new Date(0); // Epoch
      endDate = now;
      break;
    default: // All time
      startDate = new Date(0); // Epoch
      endDate = now;
      break;
  }
  return { startDate, endDate };
};

// Function to get aggregated report data
const getAggregatedReportData = async (userId, reportType, timePeriod) => {
  const { startDate, endDate } = getStartAndEndDate(timePeriod);

  const matchQuery = {
    user: userId,
    date: { $gte: startDate, $lte: endDate }
  };

  let pipeline = [
    { $match: matchQuery },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] } },
        totalExpense: { $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] } },
        transactions: { $push: "$$ROOT" } // Keep original transactions for detailed reports
      }
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
        totalExpense: 1,
        totalProfit: { $subtract: ["$totalRevenue", "$totalExpense"] },
        transactions: 1
      }
    }
  ];

  const result = await Transaction.aggregate(pipeline);
  const data = result[0] || { totalRevenue: 0, totalExpense: 0, totalProfit: 0, transactions: [] };

  if (reportType === 'all') {
    return data;
  } else if (reportType === 'expense') {
    return {
      totalExpense: data.totalExpense,
      transactions: data.transactions.filter(t => t.type === 'Expense')
    };
  } else if (reportType === 'revenue') {
    return {
      totalRevenue: data.totalRevenue,
      transactions: data.transactions.filter(t => t.type === 'Income')
    };
  } else if (reportType === 'profit') {
    return {
      totalProfit: data.totalProfit,
      totalRevenue: data.totalRevenue,
      totalExpense: data.totalExpense,
      transactions: data.transactions // Profit report needs both income and expense
    };
  }
  return data;
};

// @desc    Get aggregated report data for preview
// @route   GET /api/reports/data
// @access  Private
export const getReportData = async (req, res) => {
  try {
    const { reportType, timePeriod } = req.query;
    const data = await getAggregatedReportData(req.user._id, reportType, timePeriod);
    res.json(data);
  } catch (error) {
    console.error('Error fetching report data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Generate PDF report
// @route   GET /api/reports/pdf
// @access  Private
export const generatePdf = async (req, res) => {
  try {
    const { reportType, timePeriod } = req.query; // Get reportType and timePeriod from query
    const data = await getAggregatedReportData(req.user._id, reportType, timePeriod);

    // Create HTML content for the PDF
    let htmlContent = `
      <h1>Financial Report - ${reportType.toUpperCase()} (${timePeriod.toUpperCase()})</h1>
      <p>Generated on: ${new Date().toLocaleString()}</p>
      <hr/>
    `;

    if (reportType === 'all' || reportType === 'profit') {
      htmlContent += `
        <h2>Summary</h2>
        <p>Total Revenue: $${data.totalRevenue.toFixed(2)}</p>
        <p>Total Expense: $${data.totalExpense.toFixed(2)}</p>
        <p>Net Profit: $${data.totalProfit.toFixed(2)}</p>
        <hr/>
      `;
    } else if (reportType === 'revenue') {
      htmlContent += `
        <h2>Summary</h2>
        <p>Total Revenue: $${data.totalRevenue.toFixed(2)}</p>
        <hr/>
      `;
    } else if (reportType === 'expense') {
      htmlContent += `
        <h2>Summary</h2>
        <p>Total Expense: $${data.totalExpense.toFixed(2)}</p>
        <hr/>
      `;
    }

    if (data.transactions && data.transactions.length > 0) {
      htmlContent += `
        <h2>Transactions</h2>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.transactions.forEach(t => {
        htmlContent += `
          <tr>
            <td>${t.date.toDateString()}</td>
            <td>${t.type}</td>
            <td>${t.category}</td>
            <td>${t.amount}</td>
          </tr>
        `;
      });

      htmlContent += `
          </tbody>
        </table>
      `;
    } else {
      htmlContent += `<p>No transactions found for this period and type.</p>`;
    }


    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) {
        console.error('PDF Generation Error:', err);
        return res.status(500).json({ message: 'Error generating PDF' });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.send(buffer);
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Generate CSV report
// @route   GET /api/reports/csv
// @access  Private
export const generateCsv = async (req, res) => {
  try {
    const { reportType, timePeriod } = req.query; // Get reportType and timePeriod from query
    const data = await getAggregatedReportData(req.user._id, reportType, timePeriod);

    let csvData = [];
    if (reportType === 'all' || reportType === 'profit') {
      csvData.push(['Summary']);
      csvData.push(['Total Revenue', data.totalRevenue.toFixed(2)]);
      csvData.push(['Total Expense', data.totalExpense.toFixed(2)]);
      csvData.push(['Net Profit', data.totalProfit.toFixed(2)]);
      csvData.push([]); // Empty row for separation
    } else if (reportType === 'revenue') {
      csvData.push(['Summary']);
      csvData.push(['Total Revenue', data.totalRevenue.toFixed(2)]);
      csvData.push([]);
    } else if (reportType === 'expense') {
      csvData.push(['Summary']);
      csvData.push(['Total Expense', data.totalExpense.toFixed(2)]);
      csvData.push([]);
    }

    if (data.transactions && data.transactions.length > 0) {
      csvData.push(['Date', 'Type', 'Category', 'Amount']);
      data.transactions.forEach(t => {
        csvData.push([t.date.toDateString(), t.type, t.category, t.amount]);
      });
    } else {
      csvData.push(['No transactions found for this period and type.']);
    }

    const csv = Papa.unparse(csvData);

    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
