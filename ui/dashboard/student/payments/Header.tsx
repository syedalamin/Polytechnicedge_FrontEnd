"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const PaymentHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">My Payments</Text>
      <Text variant="body" color="secondary">View your payment history</Text>
    </div>
  </div>
);
export default PaymentHeader;
