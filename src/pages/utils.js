export const VALID_DOMAINS = [
  "@students.muet.edu.pk",
  "@faculty.muet.edu.pk",
  "@admin.muet.edu.pk",
];

export function isValidMuetEmail(email) {
  return VALID_DOMAINS.some((d) => email.toLowerCase().endsWith(d));
}

export function generatePassword() {
  const upper = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const nums = "23456789";
  const syms = "@#!$";
  const all = upper + lower + nums + syms;
  let pwd =
    upper[Math.floor(Math.random() * upper.length)] +
    lower[Math.floor(Math.random() * lower.length)] +
    nums[Math.floor(Math.random() * nums.length)] +
    syms[Math.floor(Math.random() * syms.length)];
  for (let i = 0; i < 8; i++) pwd += all[Math.floor(Math.random() * all.length)];
  return pwd
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}