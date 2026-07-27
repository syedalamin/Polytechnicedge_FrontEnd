"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const CertificateHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">My Certificates</Text>
      <Text variant="body" color="secondary">Certificates you have earned</Text>
    </div>
  </div>
);
export default CertificateHeader;
