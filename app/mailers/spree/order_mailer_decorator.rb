Spree::OrderMailer.class_eval do
  # There might be a cleaner way to set locale instead of rewriting each method
  def confirm_email(order, resend = false)
    @order = order.respond_to?(:id) ? order : Spree::Order.find(order)
    I18n.locale = @order.locale
    @name = @order.billing_address.firstname
    subject = (resend ? "[#{Spree.t(:resend).upcase}] " : '')
    subject += "#{Spree.t('order_mailer.confirm_email.subject')} (##{@order.number})"
    mail(to: @order.email, from: from_address, subject: subject)

    finished("deliverability_message")
  end

  def cancel_email(order, resend = false)
    @order = order.respond_to?(:id) ? order : Spree::Order.find(order)
    I18n.locale = @order.locale
    @name = @order.billing_address.firstname
    subject = (resend ? "[#{Spree.t(:resend).upcase}] " : '')
    subject += "#{Spree.t('order_mailer.cancel_email.subject')} (##{@order.number})"
    mail(to: @order.email, from: from_address, subject: subject)
  end
end
