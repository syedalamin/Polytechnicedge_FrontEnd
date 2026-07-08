"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const PaymentHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">Payment Management</Text>
      <Text variant="body" color="secondary">View all payment transactions</Text>
    </div>
  </div>
);
export default PaymentHeader;
