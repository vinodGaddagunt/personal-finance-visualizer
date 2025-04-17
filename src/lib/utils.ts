export function formatCurrency(amount: number) {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  
  export function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  }
  