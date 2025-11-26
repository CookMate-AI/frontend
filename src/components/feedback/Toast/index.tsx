type Props = {
  message: string;
};

export default function Toast({ message }: Props) {
  return (
    <div className="flex h-70 w-250 items-center justify-center rounded-lg border-4 border-beige-600 bg-beige-300 px-4 py-2 text-navy shadow-md">
      {message}
    </div>
  );
}
