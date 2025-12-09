import { Button } from './Button';
import { motion, AnimatePresence } from "motion/react";


interface ConfirmModelProps {
  open: boolean;        // ✅ Fixed: boolean instead of Boolean
  title: string;        // ✅ Fixed: string instead of String
  message?: string;     // ✅ Fixed: string instead of String
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModel = ({ open, title, message, onCancel, onConfirm }: ConfirmModelProps) => {
  if (!open) return null; // ✅ Fixed: Added 'return'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center  rounded-md justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl"
          >
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {title}
              </h3>
              {message && (
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <Button 
                variant="secondary" 
                text="Cancel" 
                onClick={onCancel}
              />
              <Button 
                variant="primary" 
                text="Delete" 
                onClick={onConfirm}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModel;