interface WeatherIconProps {
  icon: string;
  description: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: 40,
  md: 64,
  lg: 100,
};

export function WeatherIcon({ icon, description, size = "md" }: WeatherIconProps) {
  const px = sizeMap[size];
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
      width={px}
      height={px}
      className="drop-shadow-md"
    />
  );
}
