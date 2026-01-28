namespace FarmLink_Logger
{
    public class FileLogger
    {
        private static FileLogger _fileLogger = new FileLogger();

        private FileLogger()  { }


        public static FileLogger CurrentLogger
        {
            get { return _fileLogger; }
        }


        public void Log(string message)
        {
            string dir = "D:\\LoggerData";
            string path = dir + "\\Log.txt";

            Directory.CreateDirectory(dir);

            using FileStream stream = new FileStream(
                path,
                File.Exists(path) ? FileMode.Append : FileMode.Create,
                FileAccess.Write);

            using StreamWriter writer = new StreamWriter(stream);
            writer.WriteLine($"Logged at {DateTime.Now} - {message}");
        }

    }
}
